**Online Food Delivery Application**

A full-stack web application built using React for the frontend and Spring Boot for the backend. The application allows users to browse food items, view nutritional details, select diet-based menus, and place orders through a REST-based system.

---

**Features**
- Browse food items with nutritional info
- Diet-based menu options (vegan, keto, etc.)
- Cart and order management
- REST APIs for backend communication


**Tech Stack**
- **Frontend**: React, JavaScript, CSS  
- **Backend**: Spring Boot (Java), REST APIs  
- **Database**: MySQL  
- **Build Tools**: npm, Maven  

---

**Project Structure**
Online_Food_Delivery_Application/   
├── reactapp1/ # React frontend   
│ ├── public/ # Static files    
│ ├── src/ # React source code    
│ ├── package.json # React dependencies   
│
├── Backend/ # Spring Boot backend    
│ ├── src/ # Java + resources    
│ ├── pom.xml # Maven dependencies    
│
├── .gitignore     
└── README.md     


**1 Clone the repository**
    ```bash
    git clone https://github.com/Huzaif2004/Online_Food_Delivery_Application.git
    cd Online_Food_Delivery_Application

**2 Run the Backend**

cd Backend
mvn spring-boot:run

**3️ Run the Frontend**
cd reactapp1
npm install
npm start

**Access**

**Frontend** → http://localhost:3000

**Backend API** → http://localhost:8080
