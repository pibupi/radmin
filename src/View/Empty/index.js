import React from 'react';
import { Link } from 'react-router-dom';
import './Empty.scss';

export default function Empty(props) {
  return (
    <div className="empty">
      您访问的页面，不存在，<Link to="/app">跳转会首页！</Link>
    </div>
  );
}