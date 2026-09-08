Node/module tabs. Default `underline` variant draws the single deep-maroon rule under the active tab — Sutra's signature highlight. Counts are live badges.

```jsx
<Tabs value="packing" onChange={setTab} items={[{key:'ready',label:'Ready',count:9},{key:'packing',label:'Packing',count:35},{key:'billed',label:'Billed'}]} />
<Tabs variant="pill" caps={false} items={[...]} value="all" />
```