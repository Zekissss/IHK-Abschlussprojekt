describe('Language Selection Tests', () => {

    beforeEach(() => {
      cy.visit('/login'); // Login sayfasını ziyaret et
    });
  
    it('Should switch to German language', () => {
      // Dil seçme dropdown'u bulunur ve Almanca (de) seçilir
      cy.get('select.language-dropdown').select('de');
      
      // Sayfanın dilinin değiştiği kontrol edilir
      cy.get('h1').should('contain', 'Willkommen bei SaleVali'); // Almanca başlık
      cy.get('button[type=submit]').should('contain', 'Login'); // Almanca buton
    });
  
    it('Should switch to English language', () => {
      // Dil seçme dropdown'u bulunur ve İngilizce (en) seçilir
      cy.get('select.language-dropdown').select('en');
      
      // Sayfanın dilinin değiştiği kontrol edilir
      cy.get('h1').should('contain', 'Welcome to SaleVali'); // İngilizce başlık
      cy.get('button[type=submit]').should('contain', 'Login'); // İngilizce buton
    });
  
  });
  