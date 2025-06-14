# Sorting Techniques Visualizer with Auth0 Authentication

An interactive **Sorting Algorithm Visualizer** built using **React** and styled with **Tailwind CSS**, featuring secure **Auth0 authentication**. Users must log in to access the main dashboard where they can visualize  popular sorting algorithms in action.

## Live Demo

- [https://richadas123.github.io/sort/]

---

## Features

- **Auth0 Login/Signup Authentication**
  - Secure OAuth2-based login/signup
  - Dashboard is accessible only after login

- **Sorting Algorithms Visualized**
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort

- **Controls**
  - Adjustable Sorting Speed
  - Adjustable Number of Bars
  - 'Run' Button to visualize sorting

---

## Authentication

- Integrated using **Auth0**
- User is redirected to Auth0 login/signup
- After successful authentication, user lands on the main dashboard with access to the visualizer

---



## Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Richadas123/sort.git
cd sort

2. Install Dependencies:-
npm install

3. Configure Auth0:-
Create a .env file and add your Auth0 details:
  VITE_AUTH0_DOMAIN=your-auth0-domain
  VITE_AUTH0_CLIENT_ID=your-auth0-client-id

4. Start the App:-
npm run dev

Author:-
Richa Das
GitHub: @Richadas123

