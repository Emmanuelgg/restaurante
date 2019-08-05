# Restaurant
App to restaurant

# First run
docker-compose run -v "./nodeapp:/nodeapp/" api npm install  
docker-compose run -v "./app:/app/app/" react npm install  


# Next run
Both compose (Back and front)  
docker-compose up  

# Used dependences
Compse Api  
npm install express --save  
npm install nodemon --save-dev  
npm install mysql --save  
npm install --save next react react-dom  
npm install multer --save
npm install --save sequelize
npm install --save mysql2
npm install dotenv --save

Compose App
npm install next --save  
npm install react --save  
npm install react-dom --save  
npm install react-data-table-component styled-components --save
