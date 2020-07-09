import GalleryMain from '../client/src/Components/GalleryMain.jsx';

describe('<GalleryMain /> rendering', () => {
  const photos = {
    user_id: 0,
    room_id: 0,
    room_photos: [{ imageUrl: 'https://a0.muscache.com/im/pictures/63cfabaa-bd33-4aa7-8471-39867a926b9a.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/2ed48fb2-cd21-417e-9954-514089cba203.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/8cfbeaa0-958c-486e-aa07- dbace9509e51.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/7873f200-f8f1-45ca-9421-6fd618c27d9f.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/a5ac73c8-ba40-41db-b85e-7b75e67c0b3c.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/34d46ccd-015b-4a34-9858-355d06397c9a.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/019dc6cc-5790-4870-841c-cbf01e7ad65d.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/91fb4543-6839-4f2c-8680-d46dae33720d.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/9e29f45b-6076-4afe-8a91-6ee9578f4020.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/62670305/7014e734_original.jpg?im_w=1920', description: '' }, { imageUrl: 'https://a0.muscache.com/im/pictures/47027e1f-6595-4ec2-80c6-833efc143ddb.jpg?im_w=1920', description: '' }],
    save_status: {
      name: null,
      saved: false,
    },
  };

  it('check if <GalleryMain/> is a <div></div>', () => {
    const wrapper = shallow(<GalleryMain photos={photos} />);
    expect(wrapper.type()).toEqual('div');
  });

  it('should find 5 div container for GalleryMain component', () => {
    const wrapper = mount(<GalleryMain photos={photos} />);
    expect(wrapper.find('div.gallery-container')).toHaveLength(5);
  });

  // it ('should render GalleryDetail component when button is clicked', () => {
  //   let wrapper = mount(<GalleryMain photos={photos}/>);
  //   let button = wrapper.find('button');
  //   button.simulate('click');

  // });
});
