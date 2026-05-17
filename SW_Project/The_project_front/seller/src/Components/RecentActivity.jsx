import React from 'react'
import { FiMessageCircle, FiClock } from 'react-icons/fi'


const items = [
{title:'New Sale: Vintage...', text:'Order #12543 has been confirmed.', time:'2m ago'},
{title:'New Message from...', text:'"Is the Antique Brass Lamp still available?"', time:'1h ago'},
{title:'Listing Expiring Soon', text:'Your "Set of Ceramic Mugs" listing expires in 3 days.', time:'1d ago'},
]


export default function RecentActivity(){
return (
<aside className="recent">
<h3>Recent Activity</h3>
<div className="activity-list">
{items.map((it,i)=> (
<div className="activity-card" key={i}>
<div className="icon"><FiMessageCircle/></div>
<div className="meta">
<div className="act-title">{it.title}</div>
<div className="act-text">{it.text}</div>
</div>
<div className="time">{it.time}</div>
</div>
))}
</div>
</aside>
)
}