import json
import os
import sys
import tweepy
from pathlib import Path

def main():
    api_key             = os.environ['TWITTER_API_KEY']
    api_secret          = os.environ['TWITTER_API_SECRET']
    access_token        = os.environ['TWITTER_ACCESS_TOKEN']
    access_token_secret = os.environ['TWITTER_ACCESS_TOKEN_SECRET']

    client = tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_token_secret,
    )

    posts_path = Path(__file__).parent / 'posts.json'
    with open(posts_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    unposted = [p for p in posts if not p['posted']]

    # 全件投稿済みならリセットして最初から繰り返す
    if not unposted:
        for p in posts:
            p['posted'] = False
        unposted = posts

    post = unposted[0]
    client.create_tweet(text=post['text'])
    post['posted'] = True
    print(f"投稿完了 (id={post['id']}): {post['text'][:40]}...")

    with open(posts_path, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
