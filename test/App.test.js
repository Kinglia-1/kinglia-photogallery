import App from '../client/src/Components/App.jsx';
import GalleryMain from '../client/src/Components/GalleryMain.jsx';

describe('<App /> rendering', () => {
  it('check if <App/> is a <div></div>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual('div');
  });

  // it ('should render GalleryMain component', () => {
  //   let wrapper = mount(<App />);
  //   // setTimeout(() => {
  //   //   wrapper.update();
  //   // }, 100);
  //   expect (wrapper.containsMatchingElement(<GalleryMain />)).toEqual(true);
  // });
});
