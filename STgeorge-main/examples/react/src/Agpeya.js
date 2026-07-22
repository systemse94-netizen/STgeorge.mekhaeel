import React, { useEffect, useState } from 'react';
import { loadAgpeyaList } from './contentLoader';

export default function Agpeya() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const list = await loadAgpeyaList();
      setData(list);
    })();
  }, []);

  if (!data) return <div>تحميل...</div>;

  // expect data to have keys for the 8 prayers; adjust as per your JSON schema
  const prayers = Object.keys(data || {});

  return (
    <div style={{ direction: 'rtl', textAlign: 'right', fontFamily: 'sans-serif' }}>
      <h2>الاجبية</h2>
      <div>
        {prayers.map((p) => (
          <button key={p} onClick={() => setSelected(p)} style={{ display: 'block', margin: 6 }}>
            {p}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        {selected && (
          <div>
            <h3>{selected}</h3>
            <div>{data[selected]}</div>
          </div>
        )}
      </div>
    </div>
  );
}
