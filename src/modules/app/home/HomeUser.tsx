import { useEffect, useState } from 'react';
import { Button, Card, Spin, Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import eventService from '../../../services/eventService';
import { IEvent } from '../../../types/event.types';
import ExtractNameEventType from '../../../utils/extract-name-event-type';
import { formatDate } from '../../../utils/format-date';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FireOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function HomeUser() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        if (response.data?.content) {
          setEvents(response.data.content);
        }
      } catch (err) {
        setError('Không thể tải danh sách sự kiện');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Spin size="large" className="w-full mt-20" />;
  if (error)
    return <div className="text-red-500 text-center mt-20">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="my-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          style={{ height: '560px' }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-xl shadow-lg"
        >
          {events.slice(0, 5).map((event) => (
            <SwiperSlide key={event._id}>
              <img
                src={event.imageThumbnail}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6">
                <Title level={2} className="!text-white !mb-2 !font-bold">
                  {event.name}
                </Title>
                <div className="flex flex-wrap gap-4 text-white justify-center">
                  <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-lg" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-lg" />
                    <span>{event.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <EnvironmentOutlined className="text-lg" />
                    <span>{event.location}</span>
                  </div>
                  {event.capacity > 0 && (
                    <div className="flex items-center gap-2">
                      <UserOutlined className="text-lg" />
                      <span>Có khoảng {event.capacity} vé</span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Title level={2} className="!mb-8 !text-center !text-3xl">
        Sự kiện nổi bật <FireOutlined className="text-red-500" />
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {events.map((event) => (
          <Card
            key={event._id}
            onClick={() => {
              navigate(`/${event._id}`);
            }}
            hoverable
            cover={
              <div className="relative">
                <img
                  alt={event.name}
                  src={event.imageThumbnail}
                  className="h-48 object-cover w-full"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {ExtractNameEventType(event.type)}
                  </span>
                  {event.priceTicket > 0 && (
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                      {event.priceTicket.toLocaleString()} VND
                    </span>
                  )}
                </div>
              </div>
            }
            className="shadow-md hover:shadow-lg transition-shadow group"
            actions={[
              <Button
                className="!w-[220px]"
                type="primary"
                block
                icon={<CalendarOutlined />}
              >
                Đặt vé ngay
              </Button>,
            ]}
          >
            <div className="flex flex-col gap-3">
              <Title level={4} className="!m-0 !text-lg !font-bold">
                {event.name}
              </Title>

              <div className="flex flex-col gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined />
                  <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarOutlined />
                  <span className="text-sm">
                    {formatDate(event.startDate)} • {event.startTime}
                  </span>
                </div>

                {event.capacity > 0 && (
                  <div className="flex items-center gap-2">
                    <UserOutlined />
                    <span className="text-sm">
                      Có khoảng {event.capacity} vé
                    </span>
                  </div>
                )}
              </div>

              <Text className="text-gray-600 text-sm" ellipsis>
                {event.description}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
