# 3PhotoLib

## The royalty-free photo delivery platform for free-forever use!

### Table of contents

In order to smoothly jump through the documentation sections, use the "list" icon on the top-left side of the page screen. 

1. [*Introduction*](#introduction)
2. [*History & Development*](#history)
3. [*Walkthrough*](#walkthrough)
4. [*Future improvements*](#improvements)
5. [*Conclusion*](#conclusion)
6. [*Credits*](#credits)
7. [*License*](#license)
8. [*Tools used*](#tools)



<br> <br>

### The Introduction

<br><br>

• 3PhotoLib is an online photo library, which allows you to view, save and download high quality images, whether for personal or commercial use. After setting up an account and successfully verifying it, you can search for photos of any kind through 3 of our Providers: Pixabay, Pexels and Unsplash.

<br>

• You can fully manage the photos - that is: liking/unliking them, creating a separate 'containers' (known as collections), moving or cloning photos from one collection to another, and much more! 3PhotoLib also supports downloading photos directly to your device.

<br>

• You can view each individual image in detailed mode, which showcases the photo author, the photo provider with appropiate links and will give more detailed information about the image itself. 

<br>

• All the photos available in this application are royalty-free, meaning you can use them both for commercial and personal use, free of charge. Nevertheless, I highly recommend to give some credit for the photo original authors.


<br> <br>

### History & Development

Creating something beyond the level of "personal project" felt overwhelming and out of my skill range for a long time. This time I took 
myself a challenge to overcome this problem. My goal was to build an app that might actually matter - not only for me, the developer, 
but also for people that can benefit from it.

Photos are universal property, being useful in various fields, like website design, marketing, etc. Searching for a perfect one through 
different websites might feel like an endless, daunting task. And the feel of paying the license fee for every single photo that you want 
to use is far from good, especially for non-commercial projects. 3PhotoLib is my answer to these concerns. The application unifies the 
biggest royalty-photo providers in a single app, giving you the possibility to find high-quality images much quicker. 

The initial idea for the project was to make 3PhotoLib feel more like a photos search engine, that enables to only view and download photos. 
With that thought in mind, I have started the development process of 3PhotoLib on March 24th, 2024. The first important challenge
was to incorporate different photo Providers into an app. Every Provider shares different information about a photo. While one may 
include many pieces of useful details about an image, the other one may not. This required several workarounds to be made. The "unification" 
process took a lot of testing and fixing things up. Eventually, as a proper solution was established, this issue became a thing of a past.

Afterwards, the design process of the application interface started. I have created the Searchbar, the Advaned Search Options menu, the 
Homepage component and also the Search Results page. During that time I was slowly realizing the project has a lot more potential
rather than being a simple "search-by-phrase" photo galery. So, instead of finishing the functional part of the project, I have decided to 
unleash its full potential shortly after.

June 7th, 2024 was the turning point for 3PhotoLib. The main focus was now to introduce a user account feature with all its functionalities. 
First off, the actual Landing Page has been redefined to a SignIn / LogIn page. That step involved adding the actual process of creating the 
account, verifying it, logging into it, and finally - resetting the password. All of these parts were done from scratch, and it took a huge 
amount of time to complete them. Despite some frustrating bits from time to time, I really enjoyed the process of designing the 
authentication part of the app. I have also learned a lot about forms and inputs, which surprisingly, had been my weak point for a long time.

Next step to take was to add all the interactivity that a registered user can make. It involved, among all other features, creating a 
mechanism for a user to like / unlike the photo or designing a complete photo collections system. All of the action-based additions
took 1 month and a half! During this period of time, I have made a lot of tests and fixed some issues to make sure that everything worked
correctly and the project is free from bugs / glitches of any kind. The cherry on top was the final creation of the very last webpage
inside the project - a very simple User Account page.

Since by that time, the core functionality of the project was finally completed, 3PhotoLib got released live on October 18th, 2024. 
The following month the updates were mostly about some simple bug fixing or interface impovements. However, there was still one important 
part left to be done - the responsive layout. So far, the design was already completed for the mobile version, resulting in nice and smooth 
design. Alas, that was not a true for desktop devices... yet!

Redesigning the project layout for desktop turned out to be the final challenge to overcome. Huge screen version required some extra 
mechanisms to be applied, so that the application will look great on the desktops, but also will not break or cause any modifications for 
mobile device layout. Finding a perfect balance was not an easy task. It really took plenty of work to get a satisfying result.

Ultimately, on January 1st, 2025 - the 9-month development journey has reached the finish line. The end results of (finally completed) 
application can be viewed here - https://threephotolib.vercel.app 



///////////////////////////////////////////////////

### Preview video

![video](public/readme-images/video.mp4)

<br> <br>

### Project showcase

<br> <br>

1) Landing Page

<br>

![image_1](public/readme-images/photo-13.png)

<br>

<br>


<br>

2) Sign In Page

<br>

![image_2](public/readme-images/photo-14.png)

<br>

<br>


<br>

3) Home Page

<br>

![image_3](public/readme-images/photo-1.png)

<br>

<br>


<br>

4) Search results Page

<br>

![image_4](public/readme-images/photo-9.png)

<br>


<br>

5) Search options

<br>

![image_5](public/readme-images/photo-8.png)

<br>

<br>


<br>

6) Detailed photo page (1/2)

<br>

![image_6](public/readme-images/photo-10.png)

<br>

<br>


<br>

7) Detailed photo page (2/2)

<br>

![image_7](public/readme-images/photo-11.png)

<br>

<br>


<br>

8) Liked Photos Page

<br>

![image_8](public/readme-images/photo-2.png)

<br>

<br>


<br>

9) User Collections Page

<br>

![image_9](public/readme-images/photo-3.png)

<br>

<br>


<br>

10) Collection Photos Page

<br>

![image_10](public/readme-images/photo-4.png)

<br>

<br>


<br>

11) Save To Collection Form

<br>

![image_11](public/readme-images/photo-7.png)

<br>

<br>


<br>

12) Add New Collection Form

<br>

![image_12](public/readme-images/photo-5.png)

<br>

<br>


<br>

13) Delete Collection Page

<br>

![image_13](public/readme-images/photo-6.png)

<br>

<br>


<br>

14) User Account Page

<br>

![image_14](public/readme-images/photo-12.png)

<br>

<br>


### Improvements

Despite all the features it has, 3PhotoLib can still be improved. Below is the list (not in order) of possible enhancements that I will be
trying to address in the future:

🎯 Home Page should include more sections rather than "Featured Photos". A good upgrade might be to include some other sections, such as: "Check more of: " - based on user recent search, "Trending", etc.

🎯 A possibility to make collection public to view, download, or clone by any other user. This change will probably involve creating an
extra webpage, where anyone can view public collections, and even like or rate them.

🎯 The dark-light theme switch would be a nice addition too.

🎯 A notification boxes when the action is done (after liking a photo or adding a photo to collection) might also enhance user experience. This might be also useful to show some warnings or errors occuring, like in cases where user want to like the photo,
but the maximum liked photos limit has already been reached.

🎯 Applying some animations, hover effect to buttons, or maybe some extra smooth transitions could also positively impact user experience.

<br>
<br>
<br>

## License

This project is realeased and maintained under the *MIT License*

### Tools

<br>

This project was created using these tools:

<br><br>

- Node.js
- Vue 3 
- Nuxt 3
- Typescript
- Pinia
- FontAwesome
- Prisma
- PostgreSQL
- Supabase
- Google SMTP
- Vercel
- Vite
- TailwindCSS

<br> <br>

**Special thanks & huge shoutout for Pixabay, Pexels and Unsplash for their amazing photos!**

<br><br><hr>
© Martimex 2024

