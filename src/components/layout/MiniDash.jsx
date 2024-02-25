import { Progress, Space } from 'antd';
import '../../assets/css/Dashboard.css';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

// Waraki

export default function MiniDash({ icon, name, number }) {
  const twoColors = { '0%': '#8A288E', '100%': '#fff' };

  return (
    <div>
      <div className='Dash mt-3 '>
        <div className='container'>
          <div className='dash rounded-4 shadow d-flex justify-content-between px-3 align-iteams-center'>
            <div className='icon d-flex justify-content-center align-items-center'>
              <div className='pb-2'>
                <i className={icon} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='ps-3 text-center person fs-5 f-bold'>{name}</h6>
              </div>
            </div>

            {/* Progress bar */}
            <div className=' rate p-2 '>
              <div>
                <Space wrap>
                  <Progress
                    type='circle'
                    percent={number}
                    format={(percent) => (
                      <span
                        style={{
                          color: '#A153A5',
                          fontFamily: 'Arial',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {percent}
                      </span>
                    )}
                    strokeColor={twoColors}
                    size={50} // Use the 'size' prop instead of 'width'
                  />
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MiniDash.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string, // Update prop name to 'name'
  number: PropTypes.number,
};
