const TimelineIcon = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          marginTop: '20px',
          backgroundColor: '#22FFA2',
          width: '14px',
          height: '14px',
          borderRadius: '7px',
          border: '1px solid #22FFA2',
        }}
      />
      <div
        style={{
          width: '4px',
          background: 'linear-gradient( to bottom, #22FFA2, transparent )',
          height: '100%',
          alignSelf: 'center',
        }}
      ></div>
    </div>
  );
};

export default TimelineIcon;
