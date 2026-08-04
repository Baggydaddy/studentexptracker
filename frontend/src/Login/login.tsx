import { useState } from "react";
import { BrowserProvider } from "ethers";
import "../App.css"; // your styles

const API_BASE = "http://localhost:3000/api"; // adjust URL to match your backend

type LoginProps = {
  onLoginSuccess?: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected. Please install it.");
        return;
      }
      setLoading(true);
      // request accounts (Ethers v6 BrowserProvider)
      const provider = new BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const acct = await signer.getAddress();
      setAddress(acct);
      setStatus("Connected. Requesting signature...");

      try {
        const nonceResp = await fetch(`${API_BASE}/nonce?address=${acct}`);
        if (!nonceResp.ok) {
          throw new Error("Backend unavailable");
        }

        const { nonce } = await nonceResp.json();
        const message = `Sign this message to authenticate. Nonce: ${nonce}`;
        const signature = await signer.signMessage(message);

        const verifyResp = await fetch(`${API_BASE}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: acct, signature, message }),
        });

        const verifyJson = await verifyResp.json();
        if (verifyJson.success) {
          setStatus("Login successful");
          onLoginSuccess?.();
          return;
        }

        setStatus("Verification failed");
      } catch (backendError) {
        console.warn(
          "Backend unavailable. Falling back to local session.",
          backendError,
        );
        setStatus("Backend unavailable. Using local demo session.");
        onLoginSuccess?.();
      }
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message || "Error connecting wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-page">
      <div className="container">
        <h1>My DApp</h1>
        <p className="swl">
          Secure Web3 Login — Connect Your Wallet to Continue
        </p>

        <p className="description">
          This application uses blockchain-based authentication. Connect and
          sign a message to verify your identity.
        </p>

        <div className="wallet-buttons">
          <button type="button" onClick={connectMetaMask} disabled={loading}>
            {loading ? "Connecting..." : "Connect MetaMask"}
          </button>
          {/* Add other wallet options (WalletConnect, Coinbase) if needed */}
        </div>

        <div className="status">
          <strong>Address:</strong> {address || "Not connected"}
          <br />
          <strong>Status:</strong> {status}
        </div>
      </div>
    </form>
  );
}
