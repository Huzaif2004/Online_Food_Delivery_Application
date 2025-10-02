import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer style={{backgroundColor:"#dcdce6",color:"black"}} class="footer  py-4">
    <div class="container">
      <div class="row">
       
        <div class="col-md-4 mb-4 mb-md-0">
          <h2 class="logo-text"><span>Hungry Hub</span></h2>
          <p>
          Welcome to Hungry Hub, your ultimate destination for delightful dining experiences right at your doorstep! At Hungry Hub, we believe that good food brings people together, and our mission is to make delicious meals accessible to everyone, anytime, anywhere.
          </p>
          <div class="contact">
            <p><i class="fas fa-phone"></i> 8248570488</p>
            <p><i class="fas fa-envelope"></i> info@hungryhub.com</p>
          </div>
        </div>
  
       
        <div class="col-md-4 mb-4 mb-md-0">
          <h4>Quick Links</h4>
          <ul class="list-unstyled">
            <li><a href="adminsign-in" class="text-dark">Admin Login</a></li>
            <li><a href="#" class="text-dark">Team</a></li>
            <li><a href="#" class="text-dark">Mentors</a></li>
            <li><a href="#" class="text-dark">Gallery</a></li>
            <li><a href="#" class="text-dark">Terms and Conditions</a></li>
          </ul>
        </div>
  
        
        <div class="col-md-4">
          <h4>Contact Us</h4>
          <form action="#" method="post">
            <div class="mb-3">
              <input type="email" name="email" class="form-control" placeholder="Your email address..." required/>
            </div>
            <div class="mb-3">
              <textarea rows="4" name="message" class="form-control" placeholder="Your message..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  
    <div class="footer-bottom text-center mt-4">

    </div>
</footer>
    </div>
  )
}

export default Footer