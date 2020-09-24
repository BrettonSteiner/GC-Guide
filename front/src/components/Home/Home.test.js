import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home.js';

describe('Home Component Tests', () => {
  describe('Header Tests', () => {
    it('Should test the header stuff', () => {
      const wrapper = shallow(<Home/>);
      expect(wrapper.find('#header').length).toEqual(1);
    });
  })
  describe('Footer tests', () => {
    it('Should test footer stuff', () => {
      const wrapper = shallow(<Home/>);
      expect(wrapper.find('#footer').length).toEqual(1);
    });
  });
})