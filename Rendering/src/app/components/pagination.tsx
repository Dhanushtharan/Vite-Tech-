'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../api/pagination';
import styles from '@/src/util/pagination.module.css'

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function PaginatedPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading } = useSWR<{ data: Comment[]; totalCount: number }>(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`,
    fetcher,
   {
      revalidateOnFocus: false,
      dedupingInterval: 0,
      onSuccess: () => console.log(` Data fetched for page ${page}`),
    }
  );

  if (error) return <p className="text-red-500">Failed to load comments.</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  const totalPages = Math.ceil(data.totalCount / limit);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments (Page {page})</h1>

      <ul className={styles.commentList}>
        {data.data.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <p className={styles.commentName}>{comment.name}</p>
            <p className={styles.commentEmail}>{comment.email}</p>
            <p className={styles.commentBody}>{comment.body}</p>
          </li>
        ))}
      </ul>

      <div className={styles.navControls}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`${styles.pageButton} ${page <= 1 ? styles.disabled : ''}`}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`${styles.pageButton} ${page >= totalPages ? styles.disabled : ''}`}
        >
          Next
        </button>
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`${styles.pageButton} ${
              pageNumber === page ? styles.activePage : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { getComments, Comment } from '../api/pagination';

// export default function CommentsPage() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalItems = 200;
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await getComments(currentPage);
//         setComments(data);
//         setError(null);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };         

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Comments (Page {currentPage})</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}

//       {!loading && !error && (
//         <>
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             {comments.map((comment) => (
//               <li key={comment.id} style={{ borderBottom: '1px solid #ccc', padding: 4 }}>
//                 <strong>{comment.name}</strong> &mdash; <em>{comment.email}</em>
//                 <p>{comment.body}</p>
//               </li>
//             ))}
//           </ul>

//           <div style={{ textAlign: 'center', marginTop: 20 }}>
//             <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => {
//               const page = i + 1;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => goToPage(page)}
//                   disabled={currentPage === page}
//                   style={{
//                     margin: '0 4px',
//                     fontWeight: currentPage === page ? 'bold' : 'normal',
//                   }}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





