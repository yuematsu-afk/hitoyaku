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

    if not unposted:
        print('全投稿完了済み。新しい投稿を posts.json に追加してください。')
        sys.exit(0)

    post = unposted[0]
    response = client.create_tweet(text=post['text'])
    tweet_id = response.data['id']
    post['posted'] = True
    print(f'投稿完了 (id={post["id"]}, tweet_id={tweet_id}): {post["text"][:50]}...')

    with open(posts_path, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    remaining = len([p for p in posts if not p['posted']])
    print(f'残り投稿数: {remaining}件')

if __name__ == '__main__':
    main()
