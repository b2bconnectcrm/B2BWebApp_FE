# Step 1: Use an official Node.js image as the base image for building the Angular app
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of the Angular app's source code to the working directory
COPY . .

# Step 6: Build the Angular app for production
RUN npm run build --prod

# Step 7: Use an official NGINX image as the base image for serving the app
FROM nginx:stable-alpine

# Step 8: Copy the build output from the previous stage to the NGINX public directory
COPY --from=build /usr/src/app/dist/B2BConnectWeb /usr/share/nginx/html

# Step 9: Expose port 80 for the app
EXPOSE 80

# Step 10: Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
