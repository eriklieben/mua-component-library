context('mua-search-with-select', () => {

  it('should add item to the list of component', () => {
    console.log('%cshould add item to the list of component',"color:yellow");
    
    // Arrange    
    cy.visit('/');

    // Act   
    cy.shadowGet('my-app').shadowFind('input').type('NDC Amsterdam');
    cy.shadowGet('my-app').shadowFind('button').shadowClick();
    console.log('%ccypress: added item', "color:green");
    
    // Assert
    cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(7)
      .shadowContains('NDC Amsterdam');

    cy.wait(5000); // can be removed, just to display
  });

  it('should find items that are added to the list before searching', () => {
    console.log('%cshould find items that are added to the list before searching',"color:yellow");

    // Arrange    
    cy.visit('/');
    cy.shadowGet('my-app').shadowFind('input').type('NDC Amsterdam');
    cy.shadowGet('my-app').shadowFind('button').shadowClick();
    console.log('%ccypress: added item', "color:green");
    cy.wait(500);

    // Act
    cy
      .shadowGet('my-app')
      .shadowGet('mua-search-with-select')
      .shadowFind('input')
      .shadowType('NDC');
    console.log('%ccypress: performed search',"color:green");
    cy.wait(500);
    
    // Assert
    cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(0)
      .shadowContains('NDC London');
    cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(1)
      .shadowContains('NDC Sydney');
      cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(2)
      .shadowContains('NDC Malmo');
      cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(3)
      .shadowContains('NDC Oslo');
      cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(4)
      .shadowContains('NDC Amsterdam');

      cy.wait(5000); // can be removed, just to display
  });

  it('should find items that are added to the list after searching', () => {
    console.log('%cshould find items that are added to the list after searching',"color:yellow");

    // Arrange    
    cy.visit('/');

    // Act
    cy
      .shadowGet('my-app')
      .shadowGet('mua-search-with-select')
      .shadowFind('input')
      .shadowType('NDC');
    console.log('%ccypress: performed search',"color:green");
    cy.wait(500);
    
    cy.shadowGet('my-app').shadowFind('input').type('NDC Amsterdam');
    cy.shadowGet('my-app').shadowFind('button').shadowClick();
    console.log('%ccypress: added item', "color:green");
    cy.wait(5000);
    
    // Assert
    cy
      .shadowGet('my-app')
      .shadowFind('mua-search-with-select')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowEq(4)
      .shadowContains('NDC Amsterdam');
  });
});
