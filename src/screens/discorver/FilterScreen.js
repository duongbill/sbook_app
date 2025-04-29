import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';

import { fetchLanguages, fetchGenres } from '../../api/api';

const FilterScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [pageCount, setPageCount] = useState(50);
    const [activeTab, setActiveTab] = useState('Sách');
    const [range, setRange] = useState([2, 8]);

    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    const screenWidth = Dimensions.get('window').width;
    const sliderPadding = 16;
    const sliderWidth = screenWidth - sliderPadding * 2;
    const maxFollowers = 10;

    const getThumbPosition = (value) => {
        const percentage = value / maxFollowers;
        return percentage * sliderWidth + sliderPadding - 10;
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [langs, gens] = await Promise.all([
                    fetchLanguages(),
                    fetchGenres(),
                ]);
                setLanguages(langs);
                setGenres(gens);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    const route = useRoute();
    const onApply = route.params?.onApply;

    const handleApplyFilters = () => {
        const filters = {
            sort: selectedSort,
            language: selectedLanguage,
            genre: selectedGenre,
            pageCount,
            range,
            tab: activeTab,
        };

        if (onApply) {
            onApply(filters);
        }

        navigation.goBack(); // Quay lại SearchScreen
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <Text style={[styles.headerText, { color: theme.colors.text }]}>Bộ lọc</Text>
                </View>

                <TouchableOpacity onPress={handleApplyFilters}>
                    <Ionicons name="options-outline" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Sách' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('Sách')}
                >
                    <Text style={activeTab === 'Sách' ? [styles.tabTextActive, { color: theme.colors.text }] : [styles.tabTextInactive, { color: theme.colors.textSecondary }]}>Sách</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Tác giả' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('Tác giả')}
                >
                    <Text style={activeTab === 'Tác giả' ? [styles.tabTextActive, { color: theme.colors.text }] : [styles.tabTextInactive, { color: theme.colors.textSecondary }]}>Tác giả</Text>
                </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <ScrollView style={{ flex: 1 }}>
                {activeTab === 'Sách' && (
                    <>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sắp xếp</Text>
                        <RadioButtonGroup
                            options={['Sách mới', 'Sách phổ biến']}
                            selected={selectedSort}
                            onSelect={setSelectedSort}
                        />

                        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Ngôn ngữ</Text>
                        <RadioButtonGroup
                            options={languages}
                            selected={selectedLanguage}
                            onSelect={setSelectedLanguage}
                        />

                        <Text style={styles.sectionTitle}>Số trang</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            minimumTrackTintColor="#FFD700"
                            maximumTrackTintColor={theme.colors.textSecondary}
                            value={pageCount}
                            onValueChange={setPageCount}
                        />
                        <Text style={{ textAlign: 'center' }}>{pageCount} trang</Text>

                        <Text style={styles.sectionTitle}>Thể loại</Text>
                        <RadioButtonGroup
                            options={genres}
                            selected={selectedGenre}
                            onSelect={setSelectedGenre}
                        />
                    </>
                )}

                {activeTab === 'Tác giả' && (
                    <>
                        <Text style={styles.sectionTitle}>Quốc gia</Text>
                        <RadioButtonGroup
                            options={languages}
                            selected={selectedLanguage}
                            onSelect={setSelectedLanguage}
                        />

                        <Text style={styles.sectionTitle}>Người theo dõi</Text>

                        <MultiSlider
                            style={{ width: '100%', height: 40 }}
                            values={range}
                            min={0}
                            max={10}
                            step={1}
                            sliderLength={sliderWidth}
                            onValuesChange={setRange}
                            selectedStyle={{ backgroundColor: '#FFD700' }}
                            unselectedStyle={{ backgroundColor: theme.colors.textSecondary }}
                            markerStyle={{ backgroundColor: '#FFF' }}
                        />

                        <View style={{ height: 30 }}>
                            <Text style={[styles.valueLabel, { left: getThumbPosition(range[0]) }]}>
                                {range[0]}M
                            </Text>
                            <Text style={[styles.valueLabel, { left: getThumbPosition(range[1]) }]}>
                                {range[1]}M
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>Thể loại</Text>
                        <RadioButtonGroup
                            options={genres}
                            selected={selectedGenre}
                            onSelect={setSelectedGenre}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        flex: 1,
    },
    tabActive: {
        borderBottomColor: '#FFD700',
        borderBottomWidth: 2,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabInactive: {
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabTextActive: {
        fontWeight: 'bold',
        color: '#000',
    },
    tabTextInactive: {
        color: '#888',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueLabel: {
        position: 'absolute',
        top: 0,
    },
});
