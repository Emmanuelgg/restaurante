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
  
Compose App
npm install next --save  
npm install react --save  
npm install react-dom --save  
