// src/auth/authService.js
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './msalConfig';

// Create the MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL before export
let msalInitialized = false;
const initializeMsal = async () => {
	if (!msalInitialized) {
		await msalInstance.initialize();
		// Handle any redirect from authentication
		await msalInstance.handleRedirectPromise().catch(error => {
			console.error("Redirect error:", error);
		});
		msalInitialized = true;
	}
	return msalInstance;
};

const authService = {
	// Initialize MSAL and return the instance
	async getMsalInstance() {
		return await initializeMsal();
	},

	// Get the active account
	async getAccount() {
		const instance = await this.getMsalInstance();
		const accounts = instance.getAllAccounts();
		return accounts.length > 0 ? accounts[0] : null;
	},

	// Check if user is authenticated
	async isAuthenticated() {
		const account = await this.getAccount();
		return account !== null;
	},

	// Login - using popup for simplicity
	async login() {
		const instance = await this.getMsalInstance();
		return instance.loginPopup(loginRequest);

	},

	// Logout
	async logout() {
		const instance = await this.getMsalInstance();
		return instance.logoutPopup({
			postLogoutRedirectUri: "/login"
		});
	},

	// Get token for API calls
	async getToken() {
		const instance = await this.getMsalInstance();
		const account = await this.getAccount();
		if (!account) {
			throw new Error("No active account");
		}

		try {
			const response = await instance.acquireTokenSilent({
				...loginRequest,
				account
			});
			return response.accessToken;
		} catch (error) {
			console.log("Silent token acquisition failed, using popup:", error);
			const response = await instance.acquireTokenPopup({
				...loginRequest,
				account
			});
			return response.accessToken;
		}
	}
};

// Initialize MSAL right away
initializeMsal();

export default authService;
