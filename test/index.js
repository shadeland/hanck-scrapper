/**
 * Created by adel on 5/15/17.
 */
'use strict';

const chai = require('chai')
const expect = chai.expect;
const path = require('path');
const scrapper = require(path.join('..','lib','scrapper.js'))

describe('Scrapper', function(){

    describe("creation", function(){

      it('should create a new scrcapper without config should fail', function () {

        let scrp = new scrapper();

        expect(scrp).to.be(undefined);

      });

      it('should create a new scrcapper object using provided config', function () {

          let scrp = new scrapper({
              name:'scap1',
              q:'%40JohnHancockUSA',
              count: 3,
              type:'tw',
              lastrunStart:'',
              lastrunEnd:''});

          expect(scrp.getName()).to.equal('scap1');

        });

    });

});
