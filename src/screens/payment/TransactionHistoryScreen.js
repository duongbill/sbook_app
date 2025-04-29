// TransactionHistoryScreen.js
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: white;
  paddingTop: 40px;
`;

const Header = styled.View`
  flex-direction: row;

  padding: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Summary = styled.View`
  background-color: #fff3cd;
  padding: 16px;
  margin: 10px 16px;
  border-radius: 8px;
`;

const SummaryText = styled.Text`
  font-size: 16px;
`;

const LinkText = styled.Text`
  color: blue;
  margin-top: 5px;
`;

const MonthSection = styled.View`
  margin-bottom: 16px;
`;

const MonthHeader = styled.View`
  background-color: #cce5ff;
  padding: 10px 16px;
`;

const MonthText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const TransactionItem = styled.View`
  background-color: #fffbea;
  padding: 10px 16px;
  border-bottom-width: 1px;
  border-color: #eaeaea;
  height: 70px;
`;

const TransactionTitle = styled.Text`
  font-weight: 500;
  font-size: 15px;
`;

const TransactionDate = styled.Text`
  font-size: 12px;
  color: gray;
`;

const AmountText = styled.Text`
    position: absolute;
    right: 10px;
    bottom: 10px;
  font-weight: bold;
  font-size: 15px;
  margin-top: 4px;
  color: ${props => (props.type === 'income' ? 'green' : 'red')};
`;

const TransactionHistoryScreen = ({ navigation }) => {
    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Title>Lịch sử giao dịch</Title>
            </Header>

            <ScrollView>
                <Summary>
                    <SummaryText>Số tiền đã tiêu: 200.000đ</SummaryText>
                    <LinkText>Số sách đã mua: 3</LinkText>
                </Summary>

                <MonthSection>
                    <MonthHeader>
                        <MonthText>Tháng 4/2025</MonthText>
                    </MonthHeader>

                    <TransactionItem>
                        <TransactionTitle>Nạp tiền vào ví từ CODE</TransactionTitle>
                        <TransactionDate>13:24 - 17/04/2025</TransactionDate>
                        <AmountText type="income">+100.000đ</AmountText>
                    </TransactionItem>

                    <TransactionItem>
                        <TransactionTitle>Mua sách Come home to yourself</TransactionTitle>
                        <TransactionDate>13:24 - 17/04/2025</TransactionDate>
                        <AmountText type="expense">-58.000đ</AmountText>
                    </TransactionItem>

                    <TransactionItem>
                        <TransactionTitle>Nạp tiền vào ví từ CODE</TransactionTitle>
                        <TransactionDate>13:24 - 17/04/2025</TransactionDate>
                        <AmountText type="income">+100.000đ</AmountText>
                    </TransactionItem>

                    <TransactionItem>
                        <TransactionTitle>Mua sách Come home to yourself</TransactionTitle>
                        <TransactionDate>13:24 - 17/04/2025</TransactionDate>
                        <AmountText type="expense">-58.000đ</AmountText>
                    </TransactionItem>
                </MonthSection>

                <MonthSection>
                    <MonthHeader>
                        <MonthText>Tháng 3/2025</MonthText>
                    </MonthHeader>

                    <TransactionItem>
                        <TransactionTitle>Mua sách Come home to yourself</TransactionTitle>
                        <TransactionDate>13:24 - 17/03/2025</TransactionDate>
                        <AmountText type="expense">-58.000đ</AmountText>
                    </TransactionItem>

                    <TransactionItem>
                        <TransactionTitle>Nạp tiền vào ví từ CODE</TransactionTitle>
                        <TransactionDate>13:24 - 17/03/2025</TransactionDate>
                        <AmountText type="income">+100.000đ</AmountText>
                    </TransactionItem>
                </MonthSection>
            </ScrollView>
        </Container>
    );
};

export default TransactionHistoryScreen;
