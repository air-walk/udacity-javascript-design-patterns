# Udacity - Javascript Design Patterns
This repo contains solved exercises for Udacity's *Javascript Design Patterns* course alongwith the **Neighborhood app** website code. That app uses the **Google Maps API** to render a map (and markers), **KnockoutJS** for JavaS code organization using MVVM design pattern, **Bootstrap** for styling and responsiveness and the **Wikipedia API** for fetching additional information about places.

## Prerequisites:
1. Execute the following commands in your terminal:
```bash
git clone https://github.com/air-walk/udacity-javascript-design-patterns.git
cd udacity-javascript-design-patterns/neighborhood-app
```
This is the root folder of the app.

2. Open `index.html` in a text editor and replace `YOUR_API_KEY` with the key shared via Udacity's project submission form.

## Steps:
1. Open `index.html` in your browser of choice.

## General details about the Neighborhood app:
* The app is pre-populated with a list of 5 locations.
* You can search the locations in the left sidebar, and it automatically filters out in both the list view, as well as the markers on the map.
* Clicking on either a location in the sidebar or a map marker makes the marker bounce twice and display an info window. The info window contains links to articles about that location from Wikipedia.
* The site has been tested for responsiveness on multiple devices including a high res desktop, Google Nexus 6P and Apple iPad (via the device emulator in Google Chrome). The sidebar collapses automatically on mobile devices and a *hamburger* button shows up in the navbar. Clicking on that button toggles the sidebar in those cases.
