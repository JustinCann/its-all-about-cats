# It's all about Cats 🐱

A take home test

## Prerequisites

- Node.js (v16 or later)
- npm
- yarn (optional)

## Getting Started

Follow these steps to get the project up and running... and so that you can test it 😊:

### 1. Clone the Repository

```
git clone https://github.com/your-username/its-all-about-cats.git
cd its-all-about-cats
```

### 2. Setting up The Cat API

1. **Obtain the API Key**:
    - Go to [The Cat API Signup](https://thecatapi.com/signup).
    - Follow the sign-up process to obtain your free API key.

2. **Create an .env file**:
    - In the root of your project directory, create a file named `.env`.

3. **Add the API Key to the .env file**:
    - Open the `.env` file in a text editor.
    - Add the following line, replacing `[api_key]` with the API key you obtained from The Cat API:

    ```env
    VITE_CAT_API_KEY=[api_key]
    ```

4. **Save and Close**:
    - Save the `.env` file and close your text editor.

### 3. Install Dependencies

Install all necessary dependencies:

```
npm install
```

Or using Yarn:

```
yarn install
```

### 4. Run the Development Server

Start the Vite development server:

```
npm run dev
```

Or using Yarn:

```
yarn dev
```

This project should now be live at `http://localhost:7777`.

This dev version is suitable for testing

## Building for Production

To compile the TypeScript code and create an optimised production build:

```
npm run build
```

Or using Yarn:

```
yarn build
```


## Previewing the Production Build

After building, you can preview the production build locally:

```
npm run preview
```

Or using Yarn:

```
yarn preview
```


This built project should be previewed at `http://localhost:7373`.
This production version is suitable for testing

##  Some Thoughts
I added some nice to haves in the code and annotated some areas to show my thought process.

### More Nice to Haves
- Unit Testing would have been added. I can walk you through the approaches.
- Capturing of user data for use as a sub id
-

### Observation
The api does not like animated gifs (or perhaps gifs in general). These errors are handled. It does explicitely list gif, jpg, png as filetypes