FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Compile without downloading compiler
RUN HARDHAT_DISABLE_COMPILER_DOWNLOADS=true npx hardhat compile

CMD ["npx", "hardhat", "test"]
