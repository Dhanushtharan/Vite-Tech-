'use client';

import { useEffect, useState, useRef } from 'react';
import styles from '../../util/pagination.module.css';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const limit = 10;           
const totalCount = 200;     

export default function ScrollPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchComments = async (pageNumber: number) => {
    setIsLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${pageNumber}&_limit=${limit}`
    );
    const data: Comment[] = await res.json();

    if (comments.length + data.length >= totalCount || data.length === 0) {
      setAllLoaded(true);
    }

    setComments((prev) => [...prev, ...data]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments(page);
  }, [page]);

  useEffect(() => {
    if (!lastItemRef.current || allLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );                  

    observer.observe(lastItemRef.current);
    return () => observer.disconnect();
  }, [comments, isLoading, allLoaded]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments (Scroll Down)</h1>

      <div className={styles.scrollContainer}>
        {comments.map((comment, index) => {
          const isLast = index === comments.length - 1;
          return (
            <div
              key={`${comment.id}-${index}`}
              className={styles.commentItem}
              ref={isLast ? lastItemRef : null}
            >
              <p className={styles.commentName}>{comment.name}</p>
              <p className={styles.commentEmail}>{comment.email}</p>
              <p className={styles.commentBody}>{comment.body}</p>
            </div>
          );
        })}
        {isLoading && <p className={styles.loaderText}>Loading more...</p>}
        {allLoaded && <p className={styles.loaderText}>No more comments</p>}
      </div>
    </div>
  );
}   