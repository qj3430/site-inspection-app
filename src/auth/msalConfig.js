// src/auth/msalConfig.js
import { LogLevel } from '@azure/msal-browser';
export const msalConfig = {
	auth: {
		clientId: "41aeb276-58d3-4eef-b00d-9a196eb5525a", // Replace with your Application (client) ID
		authority: "https://login.microsoftonline.com/d36eaab7-c922-4b9a-8119-f23db8daac03", // Replace with your Directory (tenant) ID
		redirectUri: "http://localhost:5173", // Must match the URI registered in Azure Portal
	},
	cache: {
		cacheLocation: "sessionStorage", // or "localStorage"
		storeAuthStateInCookie: false,
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						return;
				}
			},
		},
	},
};

// Define the scopes (permissions) your app needs
export const loginRequest = {
	scopes: ["User.Read"] // Basic user profile information
};

// Add any additional APIs your app needs to access
export const apiRequest = {
	scopes: ["api://YOUR_API_CLIENT_ID/access_as_user"] // Only needed if you have a backend API
};
