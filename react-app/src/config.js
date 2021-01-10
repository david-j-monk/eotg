var config = {};

config.endpoint = 'https://davidmonk.documents.azure.com:443/';
config.key = process.env.REACT_APP_COSMOS_DB_API_KEY;

config.database = {
  id: 'eotgdb',
};

config.issuesContainer = {
  id: 'issues',
};
config.newsContainer = {
  id: 'news',
};

config.items = {
  1: {
    id: '1',
    county: 'Kent',
    date: '20/09/20',
    title: 'BIG News',
    content: 'This is a test',
  },
  2: {
    id: '2',
    county: 'Kent',
    date: '20/09/20',
    title: 'small News',
    content: 'This is another test',
  },
};

config.newsItems = {
  1: {
    id: '1',
    county: 'Kent',
    date: '20/09/20',
    title: 'BIG News',
    content: `This is a <strong>test</strong>`,
  },
  2: {
    id: '2',
    county: 'Kent',
    date: '20/09/20',
    title: 'small News',
    content: `This is another test`,
  },
  3: {
    id: '3',
    county: 'Kent',
    date: '22/09/20',
    title: 'New playground open',
    content: `Thanks to the hard work of local residents and council members, the town now has a new playground.<br /><br />
     Local children have been playing on the new equipment at the top of Hill Road and parents have expressed their gratitude.`,
  },
  4: {
    id: '4',
    county: 'Kent',
    date: '02/09/20',
    title: 'New council app launched',
    content: `A new app has been launched today to help local residents report issues to the council, and keep up to date with local news.
    
    The app comes following a consultation with the town community which highlighted the need for easier methods of accurate incident reporting, and a desire for more public awareness of council initiatives and news. <br /><br />
    Developed by Monk Studios, the app is available for local residents to download and start using straight away.<br /><br />
    Users will be able to reports instances of dog fouling, fly tipping, and overflowing bins amongst other issues.`,
  },
  5: {
    id: '5',
    county: 'Kent',
    date: '23/09/20',
    title: 'Businesses encouraged to use NHS test and trace app',
    content: `District Council is supporting the new NHS COVID - 19 app - launched today - by encouraging businesses to get prepared and display the mandatory NHS QR code poster. <br /><br />
    NHS app The app will provide users with local risk information, alerts if they have been in close contact with someone who has tested positive, and has a built in QR code scanner to allow easy check - ins at businesses and venues. <br /><br />
    As part of its purpose to help control the spread of the virus, the app will inform the public and businesses quicker if they are at risk and will provide fast actions to take to help prevent further cases. <br /><br />
    Folkestone & Hythe District Council has been informing local businesses of the app by distributing a leaflet, whilst adhering to all social distancing rules, which contains important information about what needs to be completed ahead of the launch and how to maintain use of the app once it is up and running. <br /><br />
    Leader of Folkestone & Hythe District Council, Cllr David Monk, commented: "As we enter this new stage of the NHS Test and Trace, it is vital for businesses across all districts to ensure customers can safely and securely use the service. <br /><br />
    
    "Many traders across the district have embraced the COVID secure requirements, and promoting and encouraging use of this app is the next step in that process." <br />
    The mandatory NHS QR code poster is available from: https://www.gov.uk/create-coronavirus-qr-poster`,
  },
  6: {
    id: '6',
    county: 'Kent',
    date: '24/09/20',
    title: 'Virtual meeting to address Napier Barracks questions',
    content: `A virtual community engagement meeting is to be held to answer residents' questions regarding the use of Napier Barracks as an assessment and dispersal facility for asylum seekers.<br /><br />
    Folkestone & Hythe District Council(F&HDC) is organising the online event, which will be streamed live on YouTube this Friday(25 September) at 3pm.<br /><br />
    The Home Office and other agencies have been invited to attend, with F&HDC Leader Cllr David Monk urging key partner representatives to participate and address any issues raised.<br /><br />
    He said: "The lack of communication from the Home Office has meant we have had no way of being able to allay the fears and answer the questions raised by residents.<br /><br />
    "This is a perfect opportunity for all of the agencies involved to come together to describe the support they are giving and the actions they are taking to address concerns in an appropriate setting.<br /><br />
    "It will also allow speculation around the arrangement to be addressed - some of which has been very unhelpful and potentially damaging to our community."<br /><br />
    Questions must be submitted via email to committee@folkestone-hythe.gov.uk before 5pm on Thursday 24 September.Themes raised by residents will then be discussed by the panel as opposed to each question being asked individually.<br /><br />
    Enquiries may be rejected - as is standard council practice - if they are considered to be defamatory, frivolous or offensive.<br />Members of the public will be able to watch the meeting by visiting bit.ly / YouTubeMeetings`,
  },
};

config.issuesItems = {
  1: {
    id: '1',
    lat: 51.091284,
    lng: 1.169863,
    county: 'Kent',
    time: '2020-09-26T09:00:00',
    category: 'Dog Fouling',
    content: 'BIG POO LEFT IN PARK',
  },
  2: {
    id: '2',
    lat: 51.105312,
    lng: 1.192072,
    county: 'Kent',
    time: '2020-08-10T10:20',
    category: 'Noise',
    content: 'Bloody loud neighbours keeping me up at night',
  },
  3: {
    id: '3',
    lat: 51.13731,
    lng: 0.723445,
    county: 'Kent',
    time: '2020-05-26T00:00',
    category: 'Nuisance Parking',
    content: 'A massive lorry is obstructing the pavement every night',
  },
  4: {
    id: '4',
    lat: 50.896424,
    lng: 0.278554,
    county: 'Kent',
    time: '2020-09-14T17:45',
    category: 'Antisocial Behaviour',
    content: 'A drunk person is urinating on my doorstep.',
  },
  5: {
    id: '5',
    lat: 51.083222,
    lng: 1.187269,
    county: 'Kent',
    time: '2020-09-21T16:07',
    category: 'Fly Tipping',
    content: 'Sofa dumped on Radnor bridge Rd',
  },
  6: {
    id: '6',
    lat: 51.526398,
    lng: 0.552807,
    county: 'Essex',
    time: '2020-09-20T19:20',
    category: 'Antisocial Behaviour',
    content:
      'Drunk man shouting and swearing in the road. third night running. Same guy. Not aimed at anyone but is becoming a nuisence',
  },
  7: {
    id: '7',
    lat: 51.073777,
    lng: 1.164971,
    county: 'Kent',
    time: '2020-09-19T07:32',
    category: 'Tree Problem',
    content:
      'Tree fallen over, being propped up by other trees but could fall and is dangerous.',
  },
};

module.exports = config;
