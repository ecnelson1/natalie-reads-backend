require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns  munged books', async() => {

      const expectation = [
        {
          'id': 'yldJQ9uC8AwC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=yldJQ9uC8AwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=yldJQ9uC8AwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'Statutory Net-content Marking Requirements for Packages (undefined) and Packages of Foods, Drugs and Cosmetics',
          'summary': 'Summary Unavailable',
          'authors': [
            'Kathryn M. Schwarz',
            'Ralph Weir Smith'
          ],
          'published': '1950',
          'pages': 4
        },
        {
          'id': 'jQthDQAAQBAJ',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=jQthDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=jQthDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'Undefined',
          'summary': 'Summary Unavailable',
          'authors': [
            'Madeleine Rheinheimer'
          ],
          'published': 'Published Date Unavailable',
          'pages': 'Pages Unavailable'
        },
        {
          'id': 'os2DYPTyZ_QC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=os2DYPTyZ_QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=os2DYPTyZ_QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'A Synoptic Approach to Cumulative Impact Assessment',
          'summary': 'Summary Unavailable',
          'authors': [
            'Scott Greg Leibowitz',
            'Corvallis Environmental Research Laboratory'
          ],
          'published': '1992',
          'pages': 129
        },
        {
          'id': '9K7yUWtcb2EC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=9K7yUWtcb2EC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=9K7yUWtcb2EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'Undefined',
          'summary': 'When the rain falls are you quickly running away? When the wind blows, do you let it have its way? Do you know who you are, without a doubt? Would you always choose love, no matter the sacrifice amount? Is your mind open, does it trust the universe? Or do you live each day as though it were rehearsed? This collection of poetry will awaken a wide range of emotions. It will challenge you to face your fears, embrace heartache, and live life to the fullest. It will cause you to examine your heart and mind, questioning your ability to embrace art and beauty all around. This collection will also assist you in your quest to obtain freedom in areas that currently hold you hostage. As you embark on the journey this book holds, breathe easy and relax. Although the road is at times bumpy, in the end your soul will be at peace, your heart will be open and your spirit renewed.',
          'authors': [
            'Kristina Dizard'
          ],
          'published': '2009-04-01',
          'pages': 120
        },
        {
          'id': 'pVnglv9Wy2MC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=pVnglv9Wy2MC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=pVnglv9Wy2MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'Love Undefined',
          'summary': 'Thisbook provides insight into the complex, yet intriguing subject of love, serving as storiesthatcapture viewpointsmany people have towards relationships and friendships.These poems invite readersto explore love, anditsimpact,on many levels.Full of emotion and creativity, there is definitelya poem within this book to whichthe readercan relate, enjoy, embrace and cherish.',
          'authors': [
            'T. A. Acker'
          ],
          'published': '2008-11-17',
          'pages': 88
        },
        {
          'id': '2zM2DwAAQBAJ',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=2zM2DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=2zM2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'ZHE [NOUN] Undefined',
          'summary': 'From childhood to adulthood and across continents, this poignant and honest piece of theatre follows the lives of two British Africans living at the crossroads of culture, nationality, gender and sexuality. Humorous yet haunting, this story is told by the characters whose lives are healed and celebrated through the experience. ‘ZHE: is a compelling piece of story-telling theatre evocatively crafted by Chuck Mike. It provokes an understanding of the human condition today – where issues of gender identity remain fraught.’ Jatinder Verma, Artistic Director, Tara Arts, London, UK ‘Love ZHE – timely, courageous, imaginative, lovely narrative storytelling – rarely acknowledged, and really significant, specificity of Brit-African experience; Black is beautiful reminder; gender as construct; sex as exciting, wonderfully varied and mysterious...it will ‘explode’ onto stages in the UK – stages anywhere!’ Colin Prescod, Cultural Animator and Chair of the Institute of Race Relations, London, UK ‘The play addresses many aspects relevant to clinical psychology, including the intersection of culture, migration, gender and sexuality; the ways stories are told and heard; how our own views, perceptions and experiences influence what we can hear and see; the importance of human connection.’ Dr. Lizette Nolte, Clinical Lecturer, Department of Psychology, University of Hertfordshire, UK',
          'authors': [
            'Chuck Mike',
            'Antonia Kemi Coker',
            'Tonderai Munyevu'
          ],
          'published': '2013-11-18',
          'pages': 64
        },
        {
          'id': 'qCh2vsNdkIsC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=qCh2vsNdkIsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=qCh2vsNdkIsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'A Diary of Undefined Lives',
          'summary': 'This compilation of poems is not only from personal experiences, but also in regards to many other individuals which I have spoken with. From some of these discussions, I have also developed rare connections with these said individuals who have willingly given their permission for me to analyze their stories and experiences; from these pieces, I was able to build life from their words, and also from my own. Many situations have presented themselves with much effort on my part, and in some ways it became fairly easy to draw certain conclusions. "A Diary of Undefined Lives: Beyond the Depths of Poetry," pertains to our very own lives, way of life, how we live it, and what we have grasped from the experiences. This book and how it is detailed will serve the purpose of reminding all, that we have and share a very special purpose. We are all apart of each other, and even if it happens to be just one person that tries to make a difference, the find-ings, and outcome affect us all. In this way it is fair to say that we may analyze and hope-fully learn and accept some of those personal effects about ourselves while changing the ones encrypted that influences the fear of change, and/or accepting ourselves. We all have moments in our lives where, it seem as though nothing can go right, but surely, if we bear in mind that everything we do, we are not alone, and that there is always someone else that can relate to the very events which we take part in, we will def-initely reach that point where we will acquire that feeling of peace in ourselves in order to be fulfilled and happy. God himself never gives us more that we can take, or handle, and in various cases, the encounters we undergo are mere tests to see how we do under pressure, and if we would "shun" him in this process instead of seeking him out. This book exists to assist readers in searching for and finding a higher power in themselves, by grasping control over their lives and to do so without fear. I was born Kamelia Sarita Pinnock on October 6th 1979 and raised in beautiful Jamaica W.I. There I lived with my mom: Avia Allen Pinnock; dad: Ronald Pinnock; brother: Renrick Pinnock and two sisters: Sue-Ann Pinnock and Shelly-Ann Pinnock. Ever since I can recall, I have always loved to write, I found it very appealing, and it was the best way of putting my true feelings on paper and into genuine heartfelt words. While attend-ing Prep school I discovered that writing had become a great part of me and my life. I remembered scribbling pages of poetry, then asking my family and friends for feedback, I was about 9 years old at this time. I wrote many short stories where, in my own little way I was very proud of. When I started to attend High School: Convent of Mercy Academy Alpha from 1991-1996, the need to write more, escalated and I found myself doing very well with writ-ten essays, those were my specialty, no end in sight there, as I wrote all I could until my mind was empty. I graduated High school after 5 years and attended a community College: Excelsior Community College from 1996-1997, where I studied Computer Science. My intention is for readers to grasp the hidden messages behind each word or poem that I have written. My dream it to change the lives of my readers. I pray to one day touch individuals in a way where they can make their dreams a reality. My family has been more inspiration for me than I could have possibly asked for. On December 18th 2001 I married my husband, Collin Morgan, who is presently serving in the U.S. Military. God blessed me with a baby girl on April 8th 2003, Khadijah Rihana Morgan. After my daughter\'s birth, I believed nothing was capable of topping that occasion. And nothing has since.',
          'authors': [
            'Kamelia Morgan'
          ],
          'published': '2006-03',
          'pages': 88
        },
        {
          'id': '5HJmD0c0EysC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=5HJmD0c0EysC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=5HJmD0c0EysC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'Humanants: The Undefined Mind',
          'summary': 'Summary Unavailable',
          'authors': 'Author(s)Unavailable',
          'published': 'Published Date Unavailable',
          'pages': 'Pages Unavailable'
        },
        {
          'id': '1hBelCbIyzcC',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=1hBelCbIyzcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=1hBelCbIyzcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'When Love Is Undefined',
          'summary': 'Are you searching for a life partner? Are you searching for love? Are you married and you wonder whether you really love your spouse? This book answers your questions.Love can be eternal, it can be sublime but when it is either misunderstood or discard its essence disaster is inevitable. Basically, you can\'t give what you don\'t have. Attraction and emotions can bring two people together but Love sustains the relationship.Are you in love, do you really think you are in love? Don\'t be in a hurry to respond. The beauty you desire in your relationship is just before your eyes. Its time to say goodbye to heart aches, broken relationships and divorce. It\'s time to redefine love again.Knowledge is all you need to cross that bridge, it is here before you.',
          'authors': [
            'I. Williams'
          ],
          'published': '2011-07-15',
          'pages': 32
        },
        {
          'id': '24BAAQAAMAAJ',
          'img': {
            'smallThumbnail': 'http://books.google.com/books/content?id=24BAAQAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=24BAAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
          },
          'title': 'General Report on the Eleventh Census of New South Wales',
          'summary': 'Summary Unavailable',
          'authors': [
            'New South Wales. Bureau of Statistics and Economics',
            'Sir Timothy Augustine Coghlan'
          ],
          'published': '1894',
          'pages': 334
        }
      ];

      const data = await fakeRequest(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns array of user specific favorite books', async() => {

      const expectation = [
       
      ];

      const data = await fakeRequest(app)
        .get('/api/favorites')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

  });
});
