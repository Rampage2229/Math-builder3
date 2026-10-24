<<<<<<< SEARCH
const ProbabilityDistribution = ({ data }: ProbabilityDistributionProps) => {
  const config = useMemo(() => {
    const colors = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
    const color = colors[data?.index % colors.length] || '#3B82F6';
    
    const config = {
      type: 'bar' as const,
      data: {
        datasets: [{
          label: 'Probability',
          data: data?.map((item: { value: number; probability: number }) => ({
            x: item.value,
            y: item.probability
          })) || [],
          backgroundColor: color,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: { display: true, text: 'Value' },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Probability' },
            max: 1,
          },
        },
      },
    };
    
    return config;
  }, [data]);
  
  return <canvas id="probability-chart" width={800} height={400} />;
};
>>>>>>> REPLACE
