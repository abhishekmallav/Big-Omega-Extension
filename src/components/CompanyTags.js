import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import problemToCompanyMatcher from "../resources/company-wise-problem-list";

// Company name to Simple Icons slug mapping
const companyToSlug = {
	"Google": "google",
	"Amazon": "amazon",
	"Microsoft": "microsoft",
	"Facebook": "facebook",
	"Meta": "meta",
	"Apple": "apple",
	"Bloomberg": "bloomberg",
	"Goldman Sachs": "goldmansachs",
	"Adobe": "adobe",
	"Uber": "uber",
	"Oracle": "oracle",
	"Netflix": "netflix",
	"LinkedIn": "linkedin",
	"Twitter": "twitter",
	"X": "x",
	"Snapchat": "snapchat",
	"Snap": "snapchat",
	"Airbnb": "airbnb",
	"Salesforce": "salesforce",
	"Tesla": "tesla",
	"Nvidia": "nvidia",
	"Intel": "intel",
	"IBM": "ibm",
	"Cisco": "cisco",
	"VMware": "vmware",
	"PayPal": "paypal",
	"Paypal": "paypal",
	"eBay": "ebay",
	"Spotify": "spotify",
	"Dropbox": "dropbox",
	"Lyft": "lyft",
	"DoorDash": "doordash",
	"Shopify": "shopify",
	"Square": "square",
	"Stripe": "stripe",
	"Atlassian": "atlassian",
	"Twilio": "twilio",
	"ServiceNow": "servicenow",
	"Workday": "workday",
	"Zoom": "zoom",
	"Slack": "slack",
	"Reddit": "reddit",
	"Pinterest": "pinterest",
	"TikTok": "tiktok",
	"ByteDance": "bytedance",
	"Roblox": "roblox",
	"Epic Games": "epicgames",
	"EA": "ea",
	"Activision": "activision",
	"JPMorgan": "jpmorgan",
	"Morgan Stanley": "morganstanley",
	"Visa": "visa",
	"Walmart": "walmart",
	"Walmart Global Tech": "walmart",
	"American Express": "americanexpress",
	"Dell": "dell",
	"Samsung": "samsung",
	"Expedia": "expedia",
	"Yahoo": "yahoo",
	"Zoho": "zoho",
	"Accenture": "accenture",
	"Intuit": "intuit",
	"Zillow": "zillow",
	"Zomato": "zomato",
	"Huawei": "huawei",
	"Tencent": "tencent",
	"Alibaba": "alibaba",
	"Grab": "grab",
	"Flipkart": "flipkart",
	"Ola": "ola",
	"Swiggy": "swiggy",
	"JPMorgan Chase": "jpmorganchase",
	"JP Morgan": "jpmorgan",
	"Two Sigma": "twosigma",
	"Citadel": "citadel",
	"Jane Street": "janestreet",
	"Robinhood": "robinhood",
	"Coinbase": "coinbase",
	"Databricks": "databricks"
};

function getCompanyLogoUrl(companyName) {
	const slug = companyToSlug[companyName] || companyName.toLowerCase().replace(/\s+/g, '');
	// Using Simple Icons CDN with monochrome style
	return `https://cdn.simpleicons.org/${slug}`;
}

// Generic building/company icon SVG as fallback
const GenericCompanyIcon = () => (
	<svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
		<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
	</svg>
);

function CompanyTags(props) {
	const [state, setState] = useState({
		companies: [],
		theme: props.theme,
		failedLogos: new Set()
	});

	useEffect(() => {
		const updateCompanies = () => {
			let host = window.location.host.replace("www.", ""); // Normalize host
			// e.g. /problems/flip-string-to-monotone-increasing/
			let problem = window.location.pathname.split("/")[2];
			
			console.log("[Big Omega] Host:", host);
			console.log("[Big Omega] Problem:", problem);
			
			const companies = problemToCompanyMatcher[host]?.[problem] || [];
			console.log("[Big Omega] Found companies:", companies);
			
			setState((prevState) => ({
				...prevState,
				companies: companies
			}));
		};

		updateCompanies();
		handleURLChange();
		
		window.onurlchange = (event) => {
			let theme = document.querySelector("html")?.dataset?.theme;
			setState((prevState) => ({
				...prevState,
				theme: theme
			}));
			updateCompanies();
		};
	}, []);



	const handleURLChange = () => {
		const hasNativeEvent = Object.keys(window).includes("onurlchange");
		if (!hasNativeEvent) {
			let oldURL = window.location.href;
			setInterval(() => {
				const newURL = window.location.href;
				if (oldURL === newURL) {
					return;
				}
				const urlChangeEvent = new CustomEvent("urlchange", {
					detail: {
						oldURL,
						newURL
					}
				});
				oldURL = newURL;
				dispatchEvent(urlChangeEvent);
			}, 25);
			window.addEventListener("urlchange", (event) => {
				if (typeof onurlchange === "function") {
					window.onurlchange(event);
				}
			});
		}
	};

	if (state.companies.length === 0) {
		return null;
	}

	const handleLogoError = (companyName) => {
		setState((prevState) => ({
			...prevState,
			failedLogos: new Set([...prevState.failedLogos, companyName])
		}));
	};

	return (
		<>
			{state.companies.map((company, idx) => {
				const logoUrl = getCompanyLogoUrl(company.company);
				const logoFailed = state.failedLogos.has(company.company);
				
				return (
					<div
						key={company.company + idx}
						className="relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-sd-secondary-foreground"
						title={`Asked ${company.num_occur} time${company.num_occur > 1 ? 's' : ''} by ${company.company}`}
					>
						{!logoFailed ? (
							<img 
								src={logoUrl} 
								alt=""
								className="h-3.5 w-3.5"
								onError={() => handleLogoError(company.company)}
							/>
						) : (
							<GenericCompanyIcon />
						)}
						<span>{company.company}</span>
						<span className="ml-0.5 opacity-60">({company.num_occur})</span>
					</div>
				);
			})}
		</>
	);
}

export default CompanyTags;
