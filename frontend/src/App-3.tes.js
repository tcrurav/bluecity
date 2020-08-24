import Enzyme, { shallow } from 'enzyme';
import App from './App';

it("renders without crashing", () => {
    shallow(<App />);
  });
  
  it("renders Account header", () => {
    const wrapper = shallow(<App />);
    const welcome = <h1>Display Active Users Account Details</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });