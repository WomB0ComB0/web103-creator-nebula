# WEB103 Prework - *Creator Verse*

Submitted by: **MIke Odnis**

About this web app: **Application made to view and display creators, I did not want to make auth based ownership because that would mean I ahd to find a way to filter inappropriate content and implement authentication**

Time spent: **👉🏿 X** 58 hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] Truncate long descriptions, and show the full description on the content creator details page
- [x] Called the Youtube API to get the content creators channel name based on the id
- [x] Added pagination to the homepage to only show 10 content creators at a time
- [x] Reduce the amount of navigation required to edit a content creator by adding an edit button to the content creator card
- [x] Added an error route to handle invalid urls
- [ ] Added a loading spinner to the homepage while the content creators are being fetched
- [ ] Added a copy to clipboard button to the content creator details page to copy the content creators url to the clipboard
- [ ] Added a search bar to the homepage to filter the content creators by name
- [ ] Added a filter button to the homepage to filter the content creators by category

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='/src/assets/ezgif.com-video-to-gif.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with (converted from mp4 to gif) ...  ezgif.com/

## Notes

The search functionality was the most difficult aspect. Not sure as to how to implement it with pagination.

## License

Copyright [2023] [Mike Odnis]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
