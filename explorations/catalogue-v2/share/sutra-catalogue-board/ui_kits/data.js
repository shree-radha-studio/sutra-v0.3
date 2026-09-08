/* Shared mock data for Sutra UI kits (fictional customers / designs). */
window.SUTRA_DATA = (() => {
  const A = '../../assets/';
  const cols = { Sky: '#8FB3D9', Purple: '#8B6BAE', Seagreen: '#6FA391', Peach: '#E8B99B', Lilac: '#B9A3CF', Blush: '#E9B7B7', Lavender: '#B7A7D9', Mehroon: '#7A2E3A', Rani: '#C2185B', Lemon: '#E5D66B', Firozi: '#3AA6A0', Rust: '#B0552E', White: '#F2EFE8', Bottle: '#2F6B4A', Pista: '#B7D2A0' };
  const designs = [
    { code: '2798', name: 'Plazo Set', price: 4995, cat: 'Plazo set', src: A + 'samples/2798-sky.jpg', colours: ['Sky', 'Purple', 'Seagreen', 'Peach'], tag: 'Top 30', note: 'Low stock', free: 20, fg: 22, prod: 30, score: 78 },
    { code: '6002', name: 'Lilac Court', price: 4995, cat: 'Lehenga', src: A + 'samples/6002-lilac.jpg', colours: ['Lilac', 'Blush'], tag: 'Top 30', free: 12, fg: 12, prod: 0, score: 84 },
    { code: '2006', name: 'Lavender Pallu', price: 4995, cat: 'Saree', src: A + 'samples/2006-lavender.jpg', colours: ['Lavender', 'Sky', 'Peach'], free: 41, fg: 44, prod: 0, score: 61 },
    { code: '4566', name: 'Blush Cape', price: null, cat: 'Lehenga', src: A + 'samples/4566-blush.jpg', colours: ['Blush'], tag: 'Sample', tagTone: 'gold', free: 0, fg: 0, prod: 24, score: 55 },
    { code: '1243', name: 'Crop Top', price: 4995, cat: 'Crop top', colours: ['Mehroon', 'Rani', 'White'], free: 45, fg: 48, prod: 0, score: 40 },
    { code: '1457', name: 'Crop Top', price: 3995, cat: 'Crop top', colours: ['Firozi', 'Pista', 'Bottle', 'Rust'], free: 47, fg: 47, prod: 0, score: 33 },
    { code: '3661', name: 'Drape Saree', price: 5995, cat: 'Saree', colours: ['Peach', 'Pista'], free: 8, fg: 30, prod: 60, score: 71, note: 'Low stock' },
    { code: 'D9107', name: 'Blouse', price: 1495, cat: 'Blouse', colours: ['Lemon', 'White'], free: 24, fg: 40, prod: 0, score: 20 },
  ];
  const byCode = Object.fromEntries(designs.map(d => [d.code, d]));
  const customers = [
    { id: 'c1', name: 'Preeti Fashion Hub', city: 'Ludhiana', market: 'Chaura Bazaar', tier: 'Platinum', score: 92, phone: '98152 23366', transport: 'Punjab Freight', broker: 'Harjeet Singh', priority: 1, orders: [{ no: 'SO-2613', date: '06/08/26', due: -18, note: 'Chaura Bazaar trial', lines: [['D9107', 'Lemon', 5, true], ['3661', 'Peach', 4, true]] }] },
    { id: 'c2', name: 'Rangoli Ethnic Wear', city: 'Lucknow', market: 'Aminabad', tier: 'Platinum', score: 88, phone: '98395 56688', transport: 'UP Roadways', broker: 'Imran Khan', priority: 3, orders: [{ no: 'SO-2620', date: '08/08/26', due: -12, note: 'New design trial', lines: [['6002', 'Lilac', 3, true]] }] },
    { id: 'c3', name: 'Ambika Enterprises', city: 'Delhi', market: 'Chandni Chowk', tier: 'Gold', score: 74, phone: '98105 76294', transport: 'Local delivery', broker: 'Suman Traders', priority: 2, orders: [{ no: 'SO-3034', date: '01/09/26', due: 12, lines: [['1243', 'Mehroon', 3, true], ['3661', 'Peach', 4, true], ['2798', 'Sky', 5, true]] }] },
    { id: 'c4', name: 'A V Creation', city: 'Ambala', market: '', tier: 'Platinum', score: 90, phone: '93558 79111', transport: 'Patel Parcel Service', broker: 'Shubham Marketing', priority: 4, orders: [{ no: 'SO-3033', date: '01/09/26', due: 12, note: 'Ready demo order', lines: [['1457', 'Firozi', 4, true], ['1457', 'Bottle', 3, true], ['3661', 'Pista', 2, false]] }] },
    { id: 'c5', name: 'Aneri Boutique', city: 'Anand', market: '', tier: 'Silver', score: 66, phone: '98982 73380', transport: 'SNS Express', broker: 'Kishore Nathani', priority: 3, orders: [{ no: 'SO-3036', date: '01/09/26', due: 12, lines: [['2006', 'Lavender', 6, true], ['D9107', 'White', 2, true]] }] },
    { id: 'c6', name: 'Nalli Fashion Mart', city: 'Chennai', market: 'T Nagar', tier: 'Platinum', score: 95, phone: '98400 11223', transport: 'Sri Balaji Travels', broker: 'Karthik S', priority: 2, orders: [{ no: 'SO-2607', date: '29/07/26', due: -24, lines: [['6002', 'Blush', 5, false], ['2798', 'Purple', 9, false], ['1243', 'Rani', 3, true]] }, { no: 'SO-2608', date: '04/08/26', due: -23, lines: [['3661', 'Peach', 7, false]] }] },
  ];
  const parcels = [
    { code: 'P00059', status: 'OPEN', lines: [['1243', 'Mehroon', 2, 2], ['D9107', 'White', 1, 1], ['3661', 'Peach', 1, 3]] },
    { code: 'P00060', status: 'OPEN', lines: [['2798', 'Sky', 1, 2]] },
    { code: 'P00035', status: 'PACKED', lines: [['1243', 'Mehroon', 1, 1], ['D9107', 'White', 1, 1]] },
    { code: 'P00036', status: 'INVOICED', lines: [['3661', 'Peach', 2, 2]] },
  ];
  const nav = [{ key: 'home', label: 'Home', icon: 'house' }, { key: 'catalogue', label: 'Catalogue', icon: 'layout-grid' }, { key: 'carts', label: 'Carts', icon: 'shopping-bag', count: 3 }, { key: 'dispatch', label: 'Dispatch', icon: 'package', count: 42 }, { key: 'production', label: 'Production', icon: 'scissors' }, { key: 'crm', label: 'CRM', icon: 'users' }, { section: 'Hub' }, { key: 'masters', label: 'Master views', icon: 'library' }, { key: 'reports', label: 'Reports', icon: 'bar-chart-3' }, { key: 'studio', label: 'Studio', icon: 'sparkles' }, { key: 'channels', label: 'Channels', icon: 'git-branch' }];
  return { A, cols, designs, byCode, customers, parcels, nav };
})();
