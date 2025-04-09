FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the development server port
EXPOSE 3000

# Set host to 0.0.0.0 to make the server accessible outside the container
CMD ["pnpm", "dev"]
