const assert = require('assert');
const chai = require('chai');
const should = chai.should();

const LoginPage = require('../src/components/LoginPage/LoginPage');
const handleOpen = LoginPage.handleOpen;


describe('Object Test', function(){
    it('should have property name', function(){
      let car = {name:'Figo', Maker:'Ford'}
  
      car.should.have.property('name');
    });


  
  });
  