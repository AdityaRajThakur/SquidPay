FROM  node:20.12.0-alpine3.19
WORKDIR  /usr/src/app

COPY package.json README.md tsconfig.json turbo.json package-lock.json ./ 
COPY packages ./packages 
COPY apps ./apps 
RUN npm install 
RUN npm run db:generate
RUN npm run build 
CMD ["npm" , "run" ,"start"] 