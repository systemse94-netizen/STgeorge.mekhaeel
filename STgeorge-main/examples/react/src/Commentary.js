import React, { useEffect, useState } from 'react';

export default function Commentary({ type = 'old' }) {
  const [index, setIndex] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/STgeorge-main/assets/data/commentary/${type}/index.json`);
      const j = await resp.json();
      setIndex(j);
    })();
  }, [type]);

  if (!index) return <div>تحميل...</div>;

  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <h2>تفسير {type === 'old' ? 'العهد القديم' : 'العهد الجديد'}</h2>
      <pre>{JSON.stringify(index, null, 2)}</pre>
    </div>
  );
}
