import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import CompanyTags from "./components/CompanyTags";

function App() {
	const [state, setState] = useState({});

	useEffect(() => {
		// window.addEventListener("api-res", (event) => {
		// 	if (event.detail.contentScriptQuery === "getTours") {
		// 		if (event.detail.status === 200) {
		// 			setState((prevState) => ({ ...prevState, savedScreenContent: event.detail.data }));
		// 		}
		// 	}
		// });
	}, []);

	useEffect(() => {
		console.log("[Big Omega Extension] Starting injection...");
		//this.fetchStyles();
		/**
		 * TODO
		 * 1. Companies tag embedding
		 *      a. detect platform - leetcode, hackerearth,
		 *      b. detect actually code page route - https://leetcode.com/problems/<problem name>/
		 *      c. Get div where we want to show company tags from html path/id/tag from dynamic config
		 *      d. Call API to send problem string and get company tags array as response
		 *      e. ReactDOM.render(CompanyTags: ReactComponent,path: query path got from step 3)
		 *      f. Listen from browser url change and call API again if user is on a different problem
		 */
		let interval = setInterval(() => {
			let currentHref = window.location.href;
			console.log("[Big Omega Extension] Current URL:", currentHref);
			
			// Only inject on problem pages
			if (!currentHref.includes("/problems/")) {
				console.log("[Big Omega Extension] Not a problem page, skipping...");
				return;
			}
			
			// Find the pills container using a more specific selector
			// Look for the difficulty pill (Easy/Medium/Hard) which is unique
			let difficultyPill = document.querySelector('.text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard');
			console.log("[Big Omega Extension] Difficulty pill found:", !!difficultyPill);
			
			let pillsContainer = difficultyPill?.parentElement;
			console.log("[Big Omega Extension] Pills container found:", !!pillsContainer);
			
			let existingContainer = document.getElementById("big-omega-companies");
			let existingPill = document.getElementById("big-omega-companies-pill");
			console.log("[Big Omega Extension] Existing container:", !!existingContainer);
			
			if (pillsContainer && !existingContainer && !existingPill) {
				console.log("[Big Omega Extension] Injecting company pill and tags...");
				
				// Create the clickable Companies pill (same style as Topics/Hint)
				let companiesPill = document.createElement("div");
				companiesPill.id = "big-omega-companies-pill";
				companiesPill.className = "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80";
				companiesPill.innerHTML = `
					<div class="relative text-[14px] leading-[normal] p-[1px] before:block before:h-3.5 before:w-3.5 h-3.5 w-3.5 fill-none stroke-current">
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="building" class="svg-inline--fa fa-building absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path fill="currentColor" d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z"></path>
						</svg>
					</div>
					<span>Companies</span>
				`;
				
				// Add the pill after Hint pill
				pillsContainer.appendChild(companiesPill);
				
				// Create the collapsible container for company tags
				let companiesContainer = document.createElement("div");
				companiesContainer.id = "big-omega-companies";
				companiesContainer.className = "flex gap-1 flex-wrap mt-3";
				companiesContainer.style.display = "none"; // Hidden by default
				
				// Insert after the pills container
				pillsContainer.parentNode.insertBefore(companiesContainer, pillsContainer.nextSibling);
				
				// Toggle functionality
				companiesPill.addEventListener("click", () => {
					if (companiesContainer.style.display === "none") {
						companiesContainer.style.display = "flex";
						companiesPill.classList.add("bg-fill-primary");
					} else {
						companiesContainer.style.display = "none";
						companiesPill.classList.remove("bg-fill-primary");
					}
				});
				
				const root = ReactDOM.createRoot(companiesContainer);
				let theme = document.querySelector("html")?.dataset?.theme || "dark";
				console.log("[Big Omega Extension] Rendering with theme:", theme);
				root.render(<CompanyTags theme={theme} />, companiesContainer);
				clearInterval(interval);
				console.log("[Big Omega Extension] Injection complete!");
			}
		}, 1000);
	}, []);

	const APICallingLogic = (tourContent) => {
		let reqOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		};
		window.dispatchEvent(
			new CustomEvent("api-req", {
				detail: {
					contentScriptQuery: "deleteTour",
					reqOptions: reqOptions,
					url: `${process.env.REACT_APP_BASE_URL}/v1/api/tour?token=` + state.token + "&tourId=" + tourContent.id
				}
			})
		);
	};

	// Coming soon 1. Sticky bar on right side
	return <div id="big-omega-extention"></div>;
}

export default App;
