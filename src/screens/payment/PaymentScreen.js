import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const PaymentScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: 'https://placehold.co/100x150/png' }} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>Vũ Nguyễn Duy Anh</Text>
                    <Text style={styles.balance}>Số dư: 0đ</Text>
                </View>
            </View>

            <View style={styles.codeContainer}>
                <TextInput style={styles.codeInput} value="DUONGBILLPROVJP" editable={false} />
                <TouchableOpacity style={styles.codeButton}>
                    <Text style={styles.codeButtonText}>Nhập CODE</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.walletTitle}>Qua ví điện tử</Text>
            <View style={styles.walletRow}>
                <WalletButton
                    title="Ví MoMo"
                    color="#a100ff"
                    logoUrl="https://th.bing.com/th/id/OIP.zsNbsbSltBBKRk7OqGPjaAHaHa?pid=ImgDet&w=60&h=60&c=7&dpr=1.3&rs=1"
                />
                <WalletButton
                    title="Ví VNPAY"
                    color="#0066ff"
                    logoUrl="https://i.gyazo.com/4914b35ab9381a3b5a1e7e998ee9550c.png"
                />
            </View>
            <View style={styles.walletRow}>
                <WalletButton
                    title="Ví Apple Pay"
                    color="#000"
                    logoUrl="https://iconape.com/wp-content/uploads/1/12/Apple-Pay-Logo-0%D9%A4.png"
                />
                <WalletButton
                    title="Ví Zalo Pay"
                    color="#2FB95D"
                    logoUrl="https://vcci-hcm.org.vn/wp-content/uploads/2022/12/1.png"
                />
            </View>
        </ScrollView>
    );
};

const WalletButton = ({ title, color, logoUrl }) => (
    <TouchableOpacity style={[styles.walletButton, { borderColor: color }]}>
        <View style={styles.walletContent}>
            {logoUrl && <Image source={{ uri: logoUrl }} style={styles.logo} />}
            <Text style={{ color }}>{title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    header: {
        backgroundColor: '#F9E8B4',
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    balance: {
        color: '#333',
        marginTop: 4,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    codeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 6,
    },
    codeButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 8,
        borderRadius: 6,
    },
    codeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    walletTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    walletButton: {
        flex: 0.48,
        padding: 12,
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: 'center',
    },
    walletContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
        resizeMode: 'contain',
    },
});

export default PaymentScreen;
