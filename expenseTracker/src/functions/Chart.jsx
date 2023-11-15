import React, { useEffect, useRef, useState } from 'react';

const PieChart = () => {
  const [data, setData] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/ExpenseTracker/database/api/chart.php');
        const apiData = await response.json();
        // Convert the 'value' property to a numeric type
        const numericData = apiData.map(item => ({ ...item, value: parseFloat(item.value) }));
        //console.log(numericData);
        setData(numericData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const drawPieChart = (chartData) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const total = chartData.reduce((acc, { value }) => acc + value, 0);
      let startAngle = 0;

      chartData.forEach(({ value, color }) => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        // Draw the pie slice
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
        ctx.fill();
        ctx.closePath();

        // Update the start angle for the next slice
        startAngle += sliceAngle;
      });
    };

    drawPieChart(data);
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef} id="myPieChart" width="400" height="400"></canvas>
      <div>
        <h3>Categories</h3>
        <ul>
          {data.map(({ label, color, value }, index) => (
            <li key={index} style={{ color }}>
              {label}: ${value} ({((value / data.reduce((acc, { value }) => acc + value, 0)) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
