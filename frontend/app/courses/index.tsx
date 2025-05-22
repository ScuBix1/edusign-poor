import getAttendances from '@/api/attendances/getAttendances';
import getCourses from '@/api/courses/getCourses';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const BASE_URL: string = Constants.expoConfig?.extra?.BASE_URL;

interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  start_time: string;
  end_time: string;
}

interface Attendance {
  id: number;
  course_id: number;
  user_id: number;
  check_in_time: string;
  is_present: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendances, setAttendances] = useState<{
    [key: number]: Attendance[];
  }>({});
  const theme = useTheme();

  const fetchCourses = async () => {
    const result = await getCourses();
    setCourses(result);
  };

  const fetchAttendances = async (courseId: number) => {
    const data = await getAttendances(courseId);

    setAttendances((prev) => ({
      ...prev,
      [courseId]: data,
    }));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    courses.forEach((course) => {
      fetchAttendances(course.id);
    });
  }, [courses]);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 30,
          marginTop: 50,
          textAlign: 'center',
          color: theme.colors.primary,
        }}
      >
        Liste des cours
      </Text>
      {courses.map((course) => (
        <Card key={course.id} style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {course.name}
            </Text>
            <Text>Code: {course.code}</Text>
            <Text>Description: {course.description}</Text>
            <Text>Début: {new Date(course.start_time).toLocaleString()}</Text>
            <Text>Fin: {new Date(course.end_time).toLocaleString()}</Text>

            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>
              Élèves présents:
            </Text>
            {attendances[course.id]?.map((attendance) => (
              <View
                key={attendance.id}
                style={{ marginLeft: 16, marginTop: 8 }}
              >
                <Text>• {attendance.user.name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  Présent le:{' '}
                  {new Date(attendance.check_in_time).toLocaleString()}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
