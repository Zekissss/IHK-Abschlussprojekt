describe('Login Page Tests', () => {

    beforeEach(() => {
      // Testlerin her biri için login sayfasına git
      cy.visit('/login'); // URL'yi .env dosyasından alır
    });
 
    it('Successful Login with Correct Credentials', () => {
      // Doğru kimlik bilgileri ile giriş (bilgileri .env'den alıyoruz)
      cy.get('input[name=email]').type(Cypress.env('email'));
      cy.get('input[name=password]').type(Cypress.env('password'));
      cy.get('button[type=submit]').click();
      
      // Giriş başarılıysa yönlendirileceği sayfanın kontrolü
      cy.url().should('include', '/dashboard'); // URL değişebilir
      cy.get('.welcome-message').should('contain', 'Hoşgeldiniz'); // Değişebilir
    });
 
    it('Unsuccessful Login with Incorrect Credentials', () => {
      // Yanlış kimlik bilgileri ile giriş
      cy.get('input[name=email]').type('zekiyeerbas35@gmail.com');
      cy.get('input[name=password]').type('wrongpassword');
      cy.get('button[type=submit]').click();
 
      // Hata mesajının görünürlüğü
      cy.get('.error-message').should('be.visible').and('contain', 'Geçersiz giriş');
    });
 
    it('Cannot Login with Empty Fields', () => {
      // Boş alanlar ile giriş denemesi
      cy.get('button[type=submit]').click();
 
      // Uyarı mesajlarının kontrolü
      cy.get('.email-error').should('be.visible').and('contain', 'E-posta gerekli');
      cy.get('.password-error').should('be.visible').and('contain', 'Şifre gerekli');
    });
 
    it('Remember Me Option', () => {
      // Doğru kimlik bilgileri ile giriş yaparken "Beni Hatırla" seçeneğini işaretle
      cy.get('input[name=email]').type(Cypress.env('USER_EMAIL'));
      cy.get('input[name=password]').type(Cypress.env('USER_PASSWORD'));
      cy.get('input[type=checkbox]').check(); // "Beni Hatırla" seçeneğini işaretle
      cy.get('button[type=submit]').click();
 
      // Giriş sonrası oturumun uzun süreli olduğunun kontrolü
      cy.url().should('include', '/dashboard');
      cy.getCookies().should('have.length', 1); // Çerez kontrolü (örnek olarak)
    });
 
    it('Toggle Password Visibility', () => {
      // Şifre girilir
      cy.get('input[name=password]').type(Cypress.env('USER_PASSWORD'));
      
      // Şifre görünür hale getirilir (göz ikonu tıklanarak)
      cy.get('.toggle-password-visibility').click();
      
      // Şifre input alanının tipinin "text" olduğu kontrol edilir (görünür şifre)
      cy.get('input[name=password]').should('have.attr', 'type', 'text');
 
      // Şifre tekrar gizlenir
      cy.get('.toggle-password-visibility').click();
      
      // Şifre input alanının tipinin "password" olduğu kontrol edilir
      cy.get('input[name=password]').should('have.attr', 'type', 'password');
    });
  });
 