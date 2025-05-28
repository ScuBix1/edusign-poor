import getAttendances from '@/api/attendances/getAttendances';
import getCourses from '@/api/courses/getCourses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

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
  const [userRole, setUserRole] = useState<string | null>(null);
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
    AsyncStorage.getItem('user_role').then(setUserRole);
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

            {userRole === 'teacher' && (
              <Link href={`/courses/edit/${course.id}`} asChild>
                <Button
                  style={{
                    marginTop: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                  }}
                >
                  Modifier les horaires
                </Button>
              </Link>
            )}

            {userRole === 'teacher' && (
              <Link href={`/courses/manual-attendance/${course.id}`} asChild>
                <Button
                  style={{
                    marginTop: 16,
                    marginLeft: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                  }}
                >
                  Marquer présence
                </Button>
              </Link>
            )}

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
