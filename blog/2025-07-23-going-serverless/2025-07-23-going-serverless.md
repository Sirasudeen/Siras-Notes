---
title: How I Wrestled a Custom Domain onto AWS Lambda (and Almost Lost My Mind)
authors: Sirasudeen
tags: [aws, lambda, debugging, serverless]
---

# Taming the Serverless Beast: My Journey Connecting a Custom Domain to a Lambda Function URL (and the Unexpected Detours)

Hey everyone,

Today, I wanted to share a recent adventure (and occasional frustration) I had while trying to connect a **custom domain name** to a serverless function running on **AWS Lambda**, specifically using a **Lambda Function URL**. While serverless promises simplicity, getting everything to work just right can throw you some unexpected curveballs.


##  The Goal

I wanted my custom subdomain. Let’s call it `zap.siras.dev` , to serve my Lambda-based backend. The backend’s job was simple:  
> **Build a URL shortener... something quick, serverless, and clever.**

AWS has this neat thing called **Lambda Function URLs**, which let you expose your Lambda functions as HTTP endpoints... no API Gateway needed. So I deployed it using that.

It worked great, **until** I tried to hook it up with a custom domain.


##  The Brick Wall: Lambda Function URL + API Gateway

To connect my domain, I went to **API Gateway**, expecting to just choose my Lambda function from a dropdown.

**But it was empty. Nothing. Nada.**  
Lambda Function URLs were nowhere to be found.


## 🔍 The Great Debug Hunt

So I started investigating. Here’s what I checked:

-  **Same Region**: Both my Lambda function and API Gateway were in `ap-south-1`.  
-  **Public Access**: AuthType set to `NONE`.  
-  **Lambda was Live**: It worked with its direct AWS URL.  
-  **Tried Different Browsers**: Chrome, Firefox, incognito... no luck.  
-  **Even Made a New Lambda Function**: Still didn’t show up.

It was baffling.


##  Switching Gears: Trying HTTP API Gateway

Thinking maybe Function URLs were too new or incompatible, I pivoted to **HTTP API Gateway**.

But again, **same issue** when attaching the custom domain.  
The Lambda list was still empty. My hands were tied.


##  Plan C: Using REST API Gateway (Old but Gold)

Desperate, I gave **REST API Gateway** a try.

Here’s what I did:

- Created a REST API with a `{proxy+}` path.  
- Set up **Lambda Proxy Integration**.  
- Connected it to my Lambda function.

And **finally**... 🎉  
The **custom domain configuration worked**! The REST API showed up, ready to be mapped.


##  Connecting the Domain via Route 53

Next, I set up my DNS in **Route 53**:

- Added a record for `zap.siras.dev`.
- Pointed it to the API Gateway endpoint.

Then I hit the browser... and got:

> ❌ *“Site can’t be reached”*

DNS takes time to propagate. I waited, flushed DNS (`ipconfig /flushdns`), and eventually...

> ⚠️ *“Missing Authentication Token”*

Strangely, this was **good news**! 😂 It meant AWS was now **receiving** my requests.


##  Final Fixes: CORS, Auth, and Path Madness

I tweaked a few settings:

- Set **Authorization** to `NONE`.
- Made sure **API Key Required** was disabled.

Then I tested `zap.siras.dev` — it worked!  
But `zap.siras.dev/test` didn’t. Why?

Turns out, **my Express app expected `/api/test`**, but the browser sent `/test`. A quick fix in the routing logic, redeployed the function, and...


##  Success! Everything Finally Works!

All systems go!

- `zap.siras.dev` → ✅  
- `/:shortUrl` style paths → ✅  
- Lambda + API Gateway + Route 53 → ✅  

I stood up, stretched my arms, and smiled.


##  Lessons I Learned

1. **Don't Give Up** - The simplest solution may not always work, but there *is* a path forward.
2. **Lambda Function URLs are Limited** - They’re great for fast prototypes, but not fully integrated with API Gateway.
3. **REST API Still Rules for Flexibility** - Even if it’s more complex.
4. **Every Error is a Clue** - Don’t fear them. Embrace and debug them.


##  Final Thoughts

Serverless can feel like magic when it works. But when it doesn't, it can feel like you're chasing shadows. If you're going through something similar, I hope this post saves you hours of frustration.

Keep building. Keep learning.

