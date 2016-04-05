const technologies = [{
  evID: '0091',
  name: 'Drone Delivery',
  description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
  src: 'images/technology.jpg',
  status: 'Published'
}, {
  evID: '0092',
  name: 'Aerogel',
  description: 'A synthetic, porous (99.8% air), ultralight material derived from a gel, in which the liquid component of the gel has been replaced with a gas. Valued for its low density and superb thermal insulation properties, aerogel has a number of potential use cases, such as: chemical absorbers for clean-up of spills, electrochemical supercapacitors and shock absorption.',
  src: 'http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/Z5n6f3qZh8YSQS8XF',
  status: 'Draft'
},{
  evID: '0094',
  name: 'Selfie Security',
  description: 'As people become more mobile, and automation and digital technologies more pervasive, security becomes increasingly important. Online services migrate towards two-step authentication, instead of only passwords, whereas identity documents include biometric data.',
  src: 'http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/hfm3ZAxQWQBrGw47Q',
  status: 'Review'
}];

const organizations = [{
  name: 'Tesla',
  description: 'Tesla Motors, Inc. is an American automotive and energy storage company that designs, manufactures, and sells luxury electric cars, electric vehicle powertrain components, and battery products.',
  src: 'images/organization.png',
  type: 'Private'
}]

const attachments = [{
  name: 'Drone Delivery',
  description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
  src: 'images/attachment.jpg',
  type: 'Media'
}, {
  name: 'Other cool technology',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
  src: 'images/organization.png',
  type: 'Article'
}, {
  name: 'Other cool technology',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
  src: 'images/organization.png',
  type: 'Article'
}]


const projects = [{
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
},{
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
},{
  name: 'Futuro da Medicina',
  evID: 'EV0091',
  description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
  src: 'images/project.png',
  status: 'Active'
}];

const projectCollection = [{
  title: 'IT & Systems',
  description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
  subCollection: [{
    title: 'Distribution',
    description: 'Means of distribution',
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: 'images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: 'images/organization.png'
    }]
  }]
}, {
  title: 'IT & Systems',
  description: 'The capacity for being fast and efficient can mean success or failure in the field. With more resources requiring electricity to operate escalating demands should be quelled. Acquiring energy, transmitting energy, and effective use of energy gives an edge in deployed assets for their ability to remain self-sufficient and reduce expenditures on unnecessary losses.',
  subCollection: [{
    title: 'Distribution',
    description: 'Means of distribution',
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: 'images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: 'images/organization.png'
    }]
  }, {
    title: 'Production',
    description: 'Means of distribution',
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: 'images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: 'images/organization.png'
    }]
  }, ]
}]
