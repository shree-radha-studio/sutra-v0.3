Picture-first catalogue card: photo fills a 4:5 tile, one quiet label line beneath (code · name · price). Customer view = no stats; admin view = pass `stats`.

```jsx
<ProductCard src={img} code="2798" name="Plazo Set" price={4995} tag="Top 30" note="Low stock" colours={cols} activeColour="Sky" onAdd={add} />
<ProductCard code="1457" price={3995} stats={{ free: 47, fg: 47, 'in prod': 0 }} />
```